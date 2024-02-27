// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::fs::read_dir;
use std::path::PathBuf;
use tauri::Manager;
use window_shadows::set_shadow;

#[derive(Debug, Serialize, Deserialize)]
pub struct FileElement {
    #[serde(rename = "type")]
    pub type_: String,
    pub name: String,
    pub extension: String,
    pub absolute_path: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FolderElement {
    #[serde(rename = "type")]
    pub type_: String,
    pub name: String,
    pub children: Vec<PathElement>,
    #[serde(rename = "absolutePath")]
    pub absolute_path: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum PathElement {
    #[serde(untagged)]
    File(FileElement),
    #[serde(untagged)]
    Folder(FolderElement),
}

impl FolderElement {
    fn populate_children(&mut self) {
        self.children = PathBuf::from(self.absolute_path.clone()).get_children();
    }
}

trait PathBufExt {
    fn get_file_name(&self) -> String;
    fn get_absolute_path(&self) -> String;
    fn get_extension(&self) -> String;
    fn get_children(&self) -> Vec<PathElement>;
}

impl PathBufExt for PathBuf {
    fn get_file_name(&self) -> String {
        self.file_name().unwrap().to_str().unwrap().to_string()
    }

    fn get_absolute_path(&self) -> String {
        self.to_str().unwrap().to_string()
    }

    fn get_extension(&self) -> String {
        match self.extension() {
            Some(ext) => ext.to_str().unwrap().to_string(),
            None => "".to_string(), // No file extension
        }
    }

    fn get_children(&self) -> Vec<PathElement> {
        let folder_contents = read_dir(self).unwrap();
        let mut children: Vec<PathElement> = Vec::new();

        for entry in folder_contents {
            let entry = entry.unwrap();
            let entry_path = entry.path();

            if entry_path.is_dir() {
                children.push(serialize_folder(entry_path));
            } else {
                children.push(serialize_file(entry_path));
            }
        }

        children
    }
}

fn serialize_file(path: PathBuf) -> PathElement {
    let entry_name = path.get_file_name();
    let absolute_path = path.get_absolute_path();

    let entry_extention = match path.extension() {
        Some(ext) => ext.to_str().unwrap(),
        None => "", // No file extension
    };

    PathElement::File(FileElement {
        type_: "file".to_string(),
        name: entry_name.to_string(),
        extension: entry_extention.to_string(),
        absolute_path,
    })
}

fn serialize_folder(path: PathBuf) -> PathElement {
    let entry_name = path.get_file_name();
    // let children = path.get_children();
    let children = Vec::new();
    let absolute_path = path.get_absolute_path();

    let folder = FolderElement {
        type_: "folder".to_string(),
        name: entry_name,
        children,
        absolute_path,
    };

    PathElement::Folder(folder)
}

#[tauri::command]
fn populate_folder(original_tree: Vec<PathElement>, folder_path: String) -> Vec<PathElement> {
    // Look for the folder in the tree and populate it with its children
    let mut new_tree: Vec<PathElement> = Vec::new();

    for element in original_tree {
        match element {
            PathElement::Folder(mut folder) => {
                if folder.absolute_path == folder_path {
                    folder.populate_children();  // Populate the children recursively
                    new_tree.push(PathElement::Folder(folder));
                } else {
                    // Recursively process the children of the folder
                    let updated_children = populate_folder(folder.children, folder_path.clone());
                    folder.children = updated_children;

                    new_tree.push(PathElement::Folder(folder));
                }
            }
            PathElement::File(file) => {
                new_tree.push(PathElement::File(file));
            }
        }
    }

    new_tree
}

#[tauri::command]
fn generate_file_tree(folder_path: String) -> Vec<PathElement> {
    let mut file_tree: Vec<PathElement> = Vec::new();

    let folder_path = PathBuf::from(folder_path);
    let folder_contents = read_dir(folder_path).unwrap();

    for entry in folder_contents {
        let entry = entry.unwrap();
        let entry_path = entry.path();

        if entry_path.is_dir() {
            file_tree.push(serialize_folder(entry_path));
        } else {
            file_tree.push(serialize_file(entry_path));
        }
    }

    file_tree
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![generate_file_tree, populate_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

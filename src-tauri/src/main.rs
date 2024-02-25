// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::read_dir;
use std::path::PathBuf;

use serde::{Deserialize, Serialize};
use tauri::Manager;
use window_shadows::set_shadow;

#[derive(Debug, Serialize, Deserialize)]
pub struct FileElement {
    #[serde(rename = "type")]
    pub type_: String,
    pub name: String,
    pub extension: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FolderElement {
    #[serde(rename = "type")]
    pub type_: String,
    pub name: String,
    pub children: Vec<PathElement>,
}

#[derive(Debug, Serialize, Deserialize)]
// #[serde(untagged)]
pub enum PathElement {
    #[serde(flatten)]
    File(FileElement),
    #[serde(flatten)]
    Folder(FolderElement),
}

fn serialize_file(path: PathBuf) -> PathElement {
    let entry_name = path.file_name().unwrap().to_str().unwrap();

    let entry_extention = match path.extension() {
        Some(ext) => ext.to_str().unwrap(),
        None => "None",
    };

    PathElement::File(FileElement {
        type_: "file".to_string(),
        name: entry_name.to_string(),
        extension: entry_extention.to_string(),
    })
}

fn serialize_folder(path: PathBuf) -> PathElement {
    let entry_name = path.file_name().unwrap().to_str().unwrap();
    let children = generate_file_tree(path.to_str().unwrap().to_string());

    let folder = FolderElement {
        type_: "folder".to_string(),
        name: entry_name.to_string(),
        children: children,
    };

    PathElement::Folder(folder)
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
        .invoke_handler(tauri::generate_handler![generate_file_tree])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

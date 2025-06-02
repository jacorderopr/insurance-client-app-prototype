import os
import codecs # For robust encoding handling

def create_project_snapshot(root_directory, output_file_path, extensions_to_include, paths_to_ignore_relative):
    """
    Creates a single text file snapshot of specified files in a project directory.

    Args:
        root_directory (str): The absolute path to the project's root directory.
        output_file_path (str): The path where the output text file will be saved.
        extensions_to_include (list): A list of file extensions to include (e.g., ['.java', '.tsx']).
        paths_to_ignore_relative (list): A list of relative paths from the root_directory to ignore.
    """
    # Normalize paths for reliable comparison
    abs_root_directory = os.path.abspath(os.path.normpath(root_directory))
    abs_paths_to_ignore = [os.path.abspath(os.path.normpath(os.path.join(abs_root_directory, p))) for p in paths_to_ignore_relative]

    print(f"Scanning project root: {abs_root_directory}")
    print(f"Output will be saved to: {output_file_path}")
    print(f"Including extensions: {extensions_to_include}")
    print(f"Ignoring absolute paths: {abs_paths_to_ignore}")

    collected_files_count = 0

    with codecs.open(output_file_path, 'w', encoding='utf-8') as outfile:
        """
        dirpath: A string, the path to the current directory being visited.
        dirnames: A list of strings, the names of the subdirectories within dirpath (excluding . and ..).
        filenames: A list of strings, the names of the non-directory files within dirpath.
        """
        for dirpath, dirnames, filenames in os.walk(abs_root_directory, topdown=True):
            # --- Pruning: Modify dirnames in-place to prevent os.walk from descending into ignored directories ---
            # Convert current dirpath to absolute for comparison
            abs_current_dirpath = os.path.abspath(os.path.normpath(dirpath))

            # 1. Check if the CURRENT directory (dirpath) itself is within an ignored path.
            # This handles cases where an ignored path is a parent of the current path,
            # or the current path IS an ignored path that somehow wasn't pruned at its parent level.
            if any(abs_current_dirpath.startswith(ignored_path) for ignored_path in abs_paths_to_ignore):
                print(f"  Skipping directory (and its contents): {abs_current_dirpath} because it's within an ignored path.")
                dirnames[:] = []  # Clear dirnames to prevent further traversal into this branch
                continue

            # 2. Check subdirectories (dname in dirnames) of the current dirpath and remove them from traversal
            # if they are explicitly in the ignore list.
            original_dirnames = list(dirnames) # Iterate over a copy
            for dname in original_dirnames:
                potential_abs_ignored_path = os.path.abspath(os.path.normpath(os.path.join(dirpath, dname)))
                if potential_abs_ignored_path in abs_paths_to_ignore:
                    print(f"  Pruning ignored directory: {potential_abs_ignored_path}")
                    if dname in dirnames: # check if still present, might have been removed by other logic
                        dirnames.remove(dname)
            # --- End Pruning ---

            for filename in filenames:
                if any(filename.lower().endswith(ext.lower()) for ext in extensions_to_include):
                    full_file_path = os.path.join(dirpath, filename)
                    abs_full_file_path = os.path.abspath(os.path.normpath(full_file_path))

                    # Double check if the file itself is somehow within an ignored path
                    # (should be caught by directory pruning, but good as a safeguard)
                    if any(abs_full_file_path.startswith(ignored_path) for ignored_path in abs_paths_to_ignore):
                        print(f"  Skipping file explicitly: {abs_full_file_path} (inside ignored path).")
                        continue

                    relative_file_path = os.path.relpath(full_file_path, abs_root_directory)
                    # Ensure consistent path separators (Unix-style) for the demarcation
                    relative_file_path_unix = relative_file_path.replace(os.path.sep, '/')


                    print(f"  Processing: {relative_file_path_unix}")
                    outfile.write(f"=== FILENAME: {relative_file_path_unix} ===\n")
                    try:
                        with codecs.open(full_file_path, 'r', encoding='utf-8') as infile:
                            content = infile.read()
                            outfile.write(content)
                    except Exception as e:
                        outfile.write(f"ERROR: Could not read file {relative_file_path_unix}. Reason: {e}\n")
                        print(f"    ERROR reading {relative_file_path_unix}: {e}")
                    outfile.write(f"\n=== END FILENAME: {relative_file_path_unix} ===\n\n")
                    collected_files_count += 1

    print(f"\nSnapshot created successfully at: {output_file_path}")
    print(f"Total files processed: {collected_files_count}")

if __name__ == "__main__":
    # --- Configuration ---
    # !!! IMPORTANT: Make sure this path is correct for YOUR system !!!
    project_root = "/Users/jacor/Documents/insurance_client_app_prototype"

    # The name of the output file. It will be created in the same directory as the script,
    # or you can specify an absolute path.
    output_filename = "project_snapshot.txt"

    # File extensions to include in the snapshot
    target_extensions = ['.java', '.tsx', '.yml', '.ts',]

    # Relative paths from the project_root to ignore
    # For your specific case: "frontend/node_modules"
    ignore_list_relative = [
        "frontend/node_modules",
        "backend/target",
        ".vscode", 
        # Add other relative paths to ignore here if needed, e.g., ".git", "build", "dist"
        # "backend/target",
        # ".idea",
        # ".vscode"
    ]
    # --- End Configuration ---

    # Construct the full path for the output file (e.g., in the script's directory)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_file_full_path = os.path.join(script_dir, output_filename)
    # Or, if you want it in a specific location, set it directly:
    # output_file_full_path = "/Users/jacor/Desktop/project_snapshot.txt"


    # Validate project_root exists
    if not os.path.isdir(project_root):
        print(f"ERROR: Project root directory not found: {project_root}")
        print("Please check the 'project_root' variable in the script.")
    else:
        create_project_snapshot(project_root, output_file_full_path, target_extensions, ignore_list_relative)
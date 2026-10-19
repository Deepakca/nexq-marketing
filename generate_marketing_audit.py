import os

# Define valid extensions for source code review
VALID_EXTENSIONS = ('.html', '.css', '.js', '.jsx', '.tsx', '.ts', '.md')

# Folders and specific boilerplate files to exclude from the audit
EXCLUDE_DIRS = {'node_modules', '.next', '.git', 'dist', 'build', '.pytest_cache', 'public'}
EXCLUDE_FILES = {'package-lock.json', 'tsconfig.json', 'next-env.d.ts', 'eslint.config.mjs', 'next.config.ts', 'generate_marketing_audit.py'}

MAX_CHARS_PER_FILE = 2000000

def generate_marketing_audit(target_folder='.', output_filename='nexq_marketing_code_audit.txt'):
    """
    Walks through the folder and bundles only relevant source code files 
    into a single text document, overriding the existing file.
    """
    if not os.path.exists(target_folder):
        print(f"⚠️ Directory '{target_folder}' does not exist.")
        return

    outfile = open(output_filename, 'w', encoding='utf-8')
    file_count = 0

    for root, dirs, files in os.walk(target_folder):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            if file in EXCLUDE_FILES:
                continue
                
            if file.endswith(VALID_EXTENSIONS):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                        
                        header = f"\n\n{'='*60}\nFILE: {filepath}\n{'='*60}\n\n"
                        file_block = header + content
                            
                        outfile.write(file_block)
                        file_count += 1
                        print(f"Included relevant code: {filepath}")
                        
                except Exception as e:
                    error_msg = f"\nCould not read {filepath}: {e}\n"
                    outfile.write(error_msg)
    
    outfile.close()
    print(f"\n🎉 Clean audit complete! Overrode '{output_filename}' with {file_count} relevant source files (excluded lock files and boilerplate).")

if __name__ == "__main__":
    TARGET_DIRECTORY = '.' 
    OUTPUT_FILE = 'nexq_marketing_code_audit.txt'
    
    generate_marketing_audit(target_folder=TARGET_DIRECTORY, output_filename=OUTPUT_FILE)
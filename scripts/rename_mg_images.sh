#!/usr/bin/env bash

# Rename images following the `_MG_` prefix convention to `moment_` within the
# target directory (defaults to ./public). Existing files are not overwritten.

set -euo pipefail
shopt -s nullglob

TARGET_DIR="${1:-public}"
OLD_PREFIX="_MG_"
NEW_PREFIX="moment_"

files=("$TARGET_DIR"/${OLD_PREFIX}*.{jpg,jpeg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP})

if [[ ${#files[@]} -eq 0 ]]; then
  echo "No files matching ${OLD_PREFIX}* in ${TARGET_DIR}"
  exit 0
fi

for file in "${files[@]}"; do
  basename="$(basename "$file")"
  new_name="${basename/#${OLD_PREFIX}/${NEW_PREFIX}}"

  # Skip if the name is already converted
  if [[ "$basename" == "$new_name" ]]; then
    continue
  fi

  dest="${TARGET_DIR}/${new_name}"

  if [[ -e "$dest" ]]; then
    echo "Skipping ${basename}: ${dest} already exists."
    continue
  fi

  mv "$file" "$dest"
  echo "Renamed ${basename} -> ${new_name}"
done

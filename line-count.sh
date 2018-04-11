#! /bin/bash
count=0

for file in $(find src); do
   if [[ ! -d $file ]]; then
      count=$((count + $(wc -l < $file)))
   fi
done

count=$((count - $(wc -l < ./src/constants/passwords.js)))

echo "Lines: $count"

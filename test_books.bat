@echo off

REM Step 1: Read All Books and Save Input
curl.exe -X GET "http://localhost:3000/api/books" -H "Content-Type: application/json" -o original_books.json

REM Step 2: Add a New Book
curl.exe -X POST "http://localhost:3000/api/books" -H "Content-Type: application/json" -d "{\"id\":3,\"title\":\"Entangled Life\",\"author\":\"Merlin Sheldrake\",\"genre\":\"Non-Fiction\",\"price\":55}"

REM Step 3: Update the Price of Book with ID=3 to 0
curl.exe -X PUT "http://localhost:3000/api/books/3" -H "Content-Type: application/json" -d "{\"id\":3,\"title\":\"Entangled Life\",\"author\":\"Merlin Sheldrake\",\"genre\":\"Non-Fiction\",\"price\":0}"

REM Step 4: Delete Book with ID=3
curl.exe -X DELETE "http://localhost:3000/api/books/3" -H "Content-Type: application/json"

REM Step 5: Add Book with ID=3 Again in Original Form
curl.exe -X POST "http://localhost:3000/api/books" -H "Content-Type: application/json" -d "{\"id\":3,\"title\":\"Entangled Life\",\"author\":\"Merlin Sheldrake\",\"genre\":\"Non-Fiction\",\"price\":55}"

REM Step 6: Read All Books Again and Save to Check If It's the Same as Saved Input
curl.exe -X GET "http://localhost:3000/api/books" -H "Content-Type: application/json" -o updated_books.json

REM Comparing original_books.json and updated_books.json
fc original_books.json updated_books.json

REM Checking the exit code of the compare command
IF %ERRORLEVEL% EQU 0 (
    echo Books are the same as before.
    del original_books.json
    del updated_books.json
) ELSE (
    echo Error: Books are not the same as before.
)

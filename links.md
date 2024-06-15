- root
    ```dataview
    LIST
    WHERE !file.folder and !econtains(["sortspec", "Vault", "broken links output"], file.name)
    ```
- [syncthing]( http://localhost:8384 )
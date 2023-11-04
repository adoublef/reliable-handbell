import Database from "libsql"

if (
    import.meta.main
) {
    const db = new Database(':memory:');

    db.exec("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
    db.exec("INSERT INTO users (id, name, email) VALUES (1, 'Alice', 'alice@example.org')");
    
    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(1);
    // @ts-expect-error user has name and email
    console.log(`Name: ${row.name}, email: ${row.email}`); console.log("hi")
}
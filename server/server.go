package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	// API routes

	// Serve files from static folder
	http.Handle("/", http.FileServer(http.Dir("../content")))

	// Serve api /hi
	http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hi")
	})

	port := ":5000"

	fmt.Printf("Адрес странице: http://localhost")
	fmt.Println(port)
	fmt.Printf("Что-бы выключить сервер нажмите: ctrl + c\n")

	// Start server on port specified above
	log.Fatal(http.ListenAndServe(port, nil))
}

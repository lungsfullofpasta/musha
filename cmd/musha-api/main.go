// Command musha-api serves the musha.v1 Connect API.
package main

import (
	"log"
	"net/http"
	"os"

	connect "connectrpc.com/connect/v2"
	"connectrpc.com/connect/v2/connecthttp"
	"github.com/lungsfullofpasta/musha/gen/go/musha/v1/mushav1connect"
	"github.com/lungsfullofpasta/musha/internal/api"
)

func main() {
	addr := os.Getenv("ADDR")
	if addr == "" {
		addr = ":8080"
	}

	server := connect.NewServer()
	mushav1connect.RegisterAppServiceHandler(server, api.AppServer{})

	mux := http.NewServeMux()
	connecthttp.Mount(mux, server)

	srv := &http.Server{Addr: addr, Handler: mux}
	log.Printf("musha-api listening on %s", addr)
	log.Fatal(srv.ListenAndServe())
}

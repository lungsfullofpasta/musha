package api

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	connect "connectrpc.com/connect/v2"
	"connectrpc.com/connect/v2/connecthttp"
	mushav1 "github.com/lungsfullofpasta/musha/gen/go/musha/v1"
	"github.com/lungsfullofpasta/musha/gen/go/musha/v1/mushav1connect"
)

func TestGetStatus(t *testing.T) {
	mux := http.NewServeMux()
	server := connect.NewServer()
	mushav1connect.RegisterAppServiceHandler(server, AppServer{})
	connecthttp.Mount(mux, server)

	ts := httptest.NewServer(mux)
	defer ts.Close()

	client := mushav1connect.NewAppServiceClient(
		connect.NewClient(connecthttp.NewTransport(ts.Client(), ts.URL)),
	)

	res, err := client.GetStatus(context.Background(), &mushav1.GetStatusRequest{})
	if err != nil {
		t.Fatalf("GetStatus: %v", err)
	}
	if got, want := res.GetStatus(), "ok"; got != want {
		t.Errorf("status = %q, want %q", got, want)
	}
	if got, want := res.GetVersion(), Version; got != want {
		t.Errorf("version = %q, want %q", got, want)
	}
}

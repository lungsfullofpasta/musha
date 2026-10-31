// Package api implements the musha.v1 services on top of the generated Connect handlers.
package api

import (
	"context"

	mushav1 "github.com/lungsfullofpasta/musha/gen/go/musha/v1"
)

// Version is the build version reported by GetStatus. Set it at build time with
// -ldflags "-X github.com/lungsfullofpasta/musha/internal/api.Version=<value>".
var Version = "dev"

// AppServer implements mushav1connect.AppServiceHandler.
type AppServer struct{}

// GetStatus reports that the API is up and which build is running.
func (AppServer) GetStatus(_ context.Context, _ *mushav1.GetStatusRequest) (*mushav1.GetStatusResponse, error) {
	return &mushav1.GetStatusResponse{Status: "ok", Version: Version}, nil
}

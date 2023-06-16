# HEROKU用
max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count
port ENV.fetch("PORT") { 3000 }
environment "production"
pidfile ENV.fetch("PIDFILE") { "tmp/pids/server.pid" }
plugin :tmp_restart


# AWS本番環境用
# require 'puma/daemon'
#
# max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
# min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
# threads min_threads_count, max_threads_count
#
# worker_timeout 3600
#
# # set sockets
# bind "unix://#{Rails.root}/tmp/sockets/puma.sock"
#
# environment "production"
#
# pidfile File.expand_path('tmp/pids/server.pid')
#
# stdout_redirect File.expand_path('log/puma_access.log'), File.expand_path('log/puma_error.log'), true
#
# plugin :tmp_restart
#
# daemonize

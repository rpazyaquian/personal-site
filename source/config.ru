require 'rubygems'
require 'middleman/rack'

# Heroku specific

require 'rack'
require 'rack/contrib/try_static'


use Rack::Head

use Rack::TryStatic,
    :root => "tmp",
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']

run lambda { |env|
  [
    404,
    {
      "Content-Type"  => "text/html",
      "Cache-Control" => "public, max-age=60"
    },
    File.open("tmp/404/index.html", File::RDONLY)
  ]
}

run Middleman.server
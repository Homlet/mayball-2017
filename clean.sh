find . -regex ".*\.DS_Store" | xargs rm
(cd dist; git rm -rf .; git clean -dxf)

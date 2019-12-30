class Api::PostResource < JSONAPI::Resource
  attributes :title, :body, :done
end
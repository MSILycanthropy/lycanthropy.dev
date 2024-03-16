title = ask "What is the title of the post?"
categories = ask "What are the categories? (comma separated)"
time = Time.now

content = <<~POST
  ---
  title: "#{title}"
  date: #{time}
  published: false
  categories: [#{categories}]
  layout: post
  ---

  A brief description of the post.
POST


create_file "src/_posts/#{title.parameterize}.md", content

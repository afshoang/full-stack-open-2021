const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPosts) => {
  return blogPosts.reduce((total, cur) => {
    return total + cur.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)
  return sortedBlogs[sortedBlogs.length - 1]
}

const mostBlogs = (blogs) => {
  // {nameOfAuthor: numberOfBlogs}
  const countBlogsByAuthor = blogs.reduce((totalBlog, curr) => {
    if (!(curr.author in totalBlog)) {
      totalBlog[curr.author] = 1
    } else {
      totalBlog[curr.author]++
    }
    return totalBlog
  }, {})
  // Sort array by number of blog
  // Object.entries: turn a obj into array [[key, value]]
  const sortedBlogs = Object.entries(countBlogsByAuthor).sort(
    (a, b) => b[1] - a[1]
  )

  return {
    // sortedBlogs[0] author has greatest blogs
    author: sortedBlogs[0][0],
    blogs: sortedBlogs[0][1],
  }
}

const mostLikes = (blogs) => {
  // {nameOfAuthor: numberOfBlogs}
  const countBlogsByAuthor = blogs.reduce((totalBlog, curr) => {
    if (!(curr.author in totalBlog)) {
      totalBlog[curr.author] = curr.likes
    } else {
      totalBlog[curr.author] += curr.likes
    }
    return totalBlog
  }, {})

  // Sort array by number of likes
  // Object.entries: turn a obj into array [[key, value]]
  const sortedBlogs = Object.entries(countBlogsByAuthor).sort(
    (a, b) => b[1] - a[1] // sort descending
  )
  return {
    author: sortedBlogs[0][0],
    likes: sortedBlogs[0][1],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

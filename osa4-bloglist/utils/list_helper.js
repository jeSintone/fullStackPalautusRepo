const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return (blogs.reduce((sum, blog) => sum + blog.likes,0))
}
const favoriteBlog = (blogs => {
    let favBlog = {
        title: 'placeHolderTitle',
        author: 'placeHolderAUthor',
        likes: -1
    }
    if (blogs.length > 0) {
        for (let blog of blogs) {
            if (blog.likes >= favBlog.likes) {
                favBlog = blog
            }
        }
        return favBlog
    } else {
        return null
    }
})
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
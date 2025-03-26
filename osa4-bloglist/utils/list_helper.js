const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return (blogs.reduce((sum, blog) => sum + blog.likes,0))
}
const favoriteBlog = (blogs) => {
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
}

const mostBlogs = (blogs) => {
	
	if (blogs.length === 0) {
		return null
	} else {

	let authorMap = new Map() 
	for (let blog of blogs) {
		if (authorMap.has(blog.author)) {
			authorMap.set(blog.author, authorMap.get(blog.author) + 1)
		} else {
			authorMap.set(blog.author, 1)
		}
	}
	let mostBlogs = 0
	let authorWithMostBlogs = ""
	for (let author of authorMap.keys()) {

		if (authorMap.get(author) > mostBlogs) {
			authorWithMostBlogs = author
			mostBlogs = authorMap.get(author)
		}
	}
	return {
		author: authorWithMostBlogs,
		blogs: mostBlogs
	}
}
}
const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null
	} 
	let authorMap = new Map() 
	for (let blog of blogs) {
		if (authorMap.has(blog.author)) {
			authorMap.set(blog.author, authorMap.get(blog.author) + blog.likes)
		} else {
			authorMap.set(blog.author, blog.likes)
		}
	}
	console.log('test')
	console.log(authorMap)
	let mostLikes = 0
	let authorWithMostLikes = ""
	for (let author of authorMap.keys()) {

		if (authorMap.get(author) > mostLikes) {
			authorWithMostLikes = author
			mostLikes = authorMap.get(author)
		}
	}
	return {
		author: authorWithMostLikes,
		likes: mostLikes
	}

}

const initialBlogs = [
	{
		"title": "jessen blogi",
		"author": "Jesse",
		"url": "www.jessenblogimuka.com",
		"likes": 5,
	  },
	  {
		"title": "Testi numero dos",
		"author": "Jesse",
		"url": "www.jokutesti.com",
		"likes": 54,
	  }
]


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
	mostBlogs,
	mostLikes,
	initialBlogs,
}
import _ from "lodash";

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  const result = blogs.reduce((sum, current) => {
    return sum + current.likes;
  }, 0);

  return result;
};

// const blogs = [
//   {
//     _id: "5a422a851b54a676234d17f7",
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//     __v: 0,
//   },
//   {
//     _id: "5a422aa71b54a676234d17f8",
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//     __v: 0,
//   },
//   {
//     _id: "5a422b3a1b54a676234d17f9",
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//     __v: 0,
//   },
//   {
//     _id: "5a422b891b54a676234d17fa",
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//     __v: 0,
//   },
//   {
//     _id: "5a422ba71b54a676234d17fb",
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//     __v: 0,
//   },
//   {
//     _id: "5a422bc61b54a676234d17fc",
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//     __v: 0,
//   },
// ];

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0;

  const res = _.countBy(blogs, "author");
  // countBy is lodash method which is helpfull in getting the count of particular key. Here for example, I want to find the author, who has published most blogs.
  // So in the blogs array, one need to find how many blogs each author has published.
  //  By using countBy method which takes in blogs array as first parameter and by which key, one needs to find count( here: 'author'), gives array of each unique author along with their count.
  // To say in simple terms, countby method counts the number occurrences of value by their key.
  // res = { 'Michael Chan': 1, 'Edsger W. Dijkstra': 2, 'Robert C. Martin': 3 };
  //   Now, in the res object, we found pairs of value of key('author') and their count in entires blogs array.

  const [author, count] = _.maxBy(_.toPairs(res), ([, count]) => count);
  // Here we have to extract the key of max-count in res object.
  // For that we first convert res to key-value pairs by using toPairs(res) method. then feeding resulting array as 1st argument and count as 2nd argument to maxBy method,
  //  we get the author, whose has max count.
  return { author: author, blogs: count };
};

const mostLikes = (blogs) => {
    if(blogs.length === 0) return 0;

    const mostLikedOne = _.maxBy(blogs, ({likes}) => likes) 
    
    return { author: mostLikedOne.author, likes: mostLikedOne.likes }
}


export default { dummy, totalLikes, mostBlogs, mostLikes };

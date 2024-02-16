import React, { useState ,useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Cookies from 'js-cookie';


const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    // Retrieve author name from cookies
    const authorName = Cookies.get('user_name');
    console.log(authorName)
    if (authorName) {
      setAuthor(authorName);
    }
  }, []);

  
  

  const handleQuillChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
  
  // Check if any required field is empty
  if (!title || !subject || !summary || !content) {

    console.error('Please fill in all fields');
    alert("Please fill in all fields");
    return; // Prevent submission
  }
    try {
      const response = await fetch('https://quick-1k8t.onrender.com/api/writeblog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content,subject,summary,author }),
      });
      if (response.ok) {
        console.log('Blog post submitted successfully');
        alert("Blog submitted successfully")
        // Optionally, you can redirect the user to another page or show a success message
      } else {
        console.error('Failed to submit blog post:', response.statusText);
        alert("Failed to submit blog")
        // Optionally, you can display an error message to the user
      }
    } catch (error) {
      console.error('Error submitting blog post:', error);
      alert("Failed to submit blog")
      // Optionally, you can display an error message to the user
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      ['blockquote'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
    'align',
    'blockquote',
    'font', 'size', // Add font and size to the formats
  ];

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // You can handle submission logic here
  //   console.log("Title:", title);
  //   console.log("Content:", content);
    
  // };
  

  return (
    <>

    <div className='flex mt-24'>


    <div className='w-1/3 px-11 py-16  '>
      <div className="border-2 border-gray-500 p-10 rounded-3xl">
        <h1 className='font-medium text-xl pb-10 font-sans  '>How to edit text in content ?</h1>
        <h1 className='font-normal text-base pb-10 font-mono'>Step 1: Write a word.</h1>
        <h1 className='font-normal text-base pb-10 font-mono'>Step 2: Double-tap on the word to show the editor .</h1>
        <img  className="" src='images/quill.png'></img>
        <h1 className='font-normal text-base pb-10 font-mono pt-10'>These steps provide a clear guide for users to follow when applying formatting to text within the editor.</h1>
       </div>
       
    </div>

    <div className="w-2/3 justify-center items-center  h-full">
      <div className=' bg-gray-50 p-8'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label htmlFor="title" className='text-3xl font-extralight mb-2'>Title</label>
          <input
            type="text"
            id="title"
            maxLength={75}
            placeholder="Write title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mb-4 border  border-gray-300 rounded-md"
          />


         <div className='flex'> <label htmlFor="subject" className='text-3xl font-extralight mb-2 gap-4'>Subject </label>
          <input
            type="text"
            id="subject"
            placeholder=""
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 mb-4 border caret-red-600  border-gray-300 rounded-md"

          />


          


          <label htmlFor="summary" className='text-3xl font-extralight mb-2'>Summary </label>
          
          <input
            type="text"
            id="summary"
            
            placeholder=""
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className=" w-full px-4 py-2 mb-4 caret-red-600  border border-gray-300 rounded-md"
            
          />
          </div>

          {/* <h1 className='text-3xl font-extralight mb-2'>Category</h1> */}

          


          <label htmlFor="content" className='text-3xl font-extralight mb-2'>Content</label>
         
          <ReactQuill
            theme="bubble"
            value={content}
            modules={modules}
            formats={formats}
            onChange={handleQuillChange}
            className="w-full h-96 mb-4 caret-red-600  border-2 border-black border-opacity-45 bg-zinc-50 "
          />
          <div className='flex justify-evenly'><button type="publish" className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
            Publish
          </button>
          {/* <button type="draft" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            Save To Draft
          </button> */}
          </div>
        </form>
      </div>
    </div>

   
    </div>
    
    
    
    </>
    
  );
}

export default WriteBlog;

import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'; // Importing the bubble theme CSS
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const EditBlog = () => {
  const [postInfo, setPostInfo] = useState({
    title: '',
    subject: '',
    summary: '',
    content: ''
  });
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await axios.get(`https://quick-1k8t.onrender.com/api/editblog/${id}`);
        if (response.status === 200) {
          const post = response.data;
          setPostInfo(post);
          console.log(response);
        } else {
          console.error('Failed to fetch blog data');
         
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };



    fetchPostInfo();
  }, [id]);

  const handleQuillChange = (content) => {
    setPostInfo(prevInfo => ({
      ...prevInfo,
      content: content
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`https://quick-1k8t.onrender.com/api/editblog/${id}`, postInfo);
      if (response.status === 200) {
        console.log('Blog data updated successfully');
        navigate('/');
      } else {
        console.error('Failed to update blog data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <div className='w-2/3 px-11 py-16'>
          <h1 className="text-center text-3xl font-normal">Edit Blog</h1>
          <div className='bg-gray-50 p-8'>
            <form onSubmit={handleSave} className='flex flex-col'>
              <label htmlFor="title" className='text-3xl font-extralight mb-2'>Title</label>
              <input
                type="text"
                id="title"
                placeholder="Write title here"
                value={postInfo.title}
                onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <label htmlFor="subject" className='text-3xl font-extralight mb-2'>Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Write subject here"
                value={postInfo.subject}
                onChange={(e) => setPostInfo({ ...postInfo, subject: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <label htmlFor="summary" className='text-3xl font-extralight mb-2'>Summary</label>
              <input
                type="text"
                id="summary"
                placeholder="Write summary here"
                value={postInfo.summary}
                onChange={(e) => setPostInfo({ ...postInfo, summary: e.target.value })}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
              <label htmlFor="content" className='text-3xl font-extralight mb-2'>Content</label>
              <ReactQuill
                theme="bubble" // Setting the theme to bubble
                value={postInfo.content}
                onChange={handleQuillChange}
                className="w-full h-96 mb-4 border-2 border-black"
              />
              <div className='flex justify-evenly'>
                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBlog;








// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.bubble.css';

// import { useNavigate,useLocation,useParams } from "react-router-dom";



// const EditBlog = () => {
//   const [title, setTitle] = useState("");
//   const [subject, setSubject] = useState("");
//   const [summary, setSummary] = useState("");
//   const [content, setContent] = useState("");

//   const handleQuillChange = (content) => {
//     setContent(content);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

    
  
//   // Check if any required field is empty
//   if (!title || !subject || !summary || !content) {

//     console.error('Please fill in all fields');
//     alert("Please fill in all fields");
//     return; // Prevent submission
//   }
//     try {
//       const response = await fetch('http://localhost:5000/api/writeblog', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, content,subject,summary }),
//       });
//       if (response.ok) {
//         console.log('Blog post submitted successfully');
//         // Optionally, you can redirect the user to another page or show a success message
//       } else {
//         console.error('Failed to submit blog post:', response.statusText);
//         // Optionally, you can display an error message to the user
//       }
//     } catch (error) {
//       console.error('Error submitting blog post:', error);
//       // Optionally, you can display an error message to the user
//     }
//   };

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image'],
//       [{ align: [] }],
//       ['blockquote'],
//       ['clean'],
//     ],
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'list', 'bullet',
//     'link', 'image',
//     'align',
//     'blockquote',
//     'font', 'size', // Add font and size to the formats
//   ];

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   // You can handle submission logic here
//   //   console.log("Title:", title);
//   //   console.log("Content:", content);
    
//   // };
  
//   const navigate = useNavigate();
//   const params = useParams();
//   const { id } = params;

// const [postInfo, setPostInfo] = useState({
//   title: '',
//   subject: '',
//   Summary: '',
//   content: '',
// });

// const location = useLocation();
//   // const postId = location.state.postId;
//   console.log(postInfo);
    
//       // Ensure that selectedPost has a value and log it to verify
//   console.log(id);



//   return (
//     <>

//     <div className='flex justify-center items-center'>


//     <div className='w-2/3 px-11 py-16   '>

//         <h1 className="text-center  text-3xl  font-normal"> Edit Blog</h1>
//     <div className=' bg-gray-50 p-8'>
//         <form onSubmit={handleSubmit} className='flex flex-col'>
//           <label htmlFor="title" className='text-3xl font-extralight mb-2'>Title</label>
//           <input
//             type="text"
//             id="title"
//             placeholder="Write title here"
//             value={postInfo.title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
//           />


//          <div className=''> <label htmlFor="subject" className='text-3xl font-extralight mb-2 gap-4'>Subject </label>
//           <input
//             type="text"
//             id="subject"
//             placeholder=""
//             value={postInfo.subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"

//           />


//             <label htmlFor="summary" className='text-3xl font-extralight mb-2'>Summary </label>
//           <input
//             type="text"
//             id="summary"
//             placeholder=""
//             value={postInfo.summary}
//             onChange={(e) => setSummary(e.target.value)}
//             className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
//           />
//           </div>

//           {/* <h1 className='text-3xl font-extralight mb-2'>Category</h1> */}

          


//           <label htmlFor="content" className='text-3xl font-extralight mb-2'>Content</label>
         
//           <ReactQuill
//             theme="bubble"
//             value={postInfo.content}
//             modules={modules}
//             formats={formats}
//             onChange={handleQuillChange}
//             className="w-full h-96 mb-4 border-2 border-black "
//           />
//           <div className='flex justify-evenly'><button type="publish" className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
//             Save
//           </button>
//           {/* <button type="draft" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
//             Save To Draft
//           </button> */}
//           </div>
//         </form>
//       </div>
     
       
//     </div>

   
  

   
//     </div>
    
    
    
//     </>
    
//   );
// }

// export default EditBlog;

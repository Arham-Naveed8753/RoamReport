import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Articles from "./Articles";

export default function Article() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            console.log(post.$id);
            if (status) {
                appwriteService.deleteFile(post.featureImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="bg-skin min-h-screen font-jakrta text-brown pb-20 relative">
            
            {/* Full-Width Editorial Hero Image Header */}
            <div className="w-full h-[55vh] min-h-dvh sticky top-0 overflow-hidden bg-brown/10 mb-12">
                <img
                    src={appwriteService.filePreview(post.featureImage)}
                    alt={post.title}
                    className="w-full h-full object-cover "
                    onError={(e) => {
                        console.log("Image URL:", e.currentTarget.src);
                        console.log("Feature image ID:", post.featureImage);
                    }}
                />
           
            </div>

            <Container className={``}>
                <article className="max-w-4xl mx-auto -mt-24 relative z-10 ">
                    
                    {/* Main Content Card Box */}
                    <div className="bg-white p-8 sm:p-14 rounded-3xl shadow-xl border border-gray/10 mb-12">
                        
                        {/* Title & Author Actions Header */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-gray pb-8 border-dashed ">
                            <div className="space-y-4 max-w-2xl">
                                <h1 className="font-gaseok text-three_five text-brown leading-three_five">
                                    {post.title}
                                </h1>
                                
                                {/* Metadata Row (Date & Location styled like your layout) */}
                                <div className="flex items-center py-3 text-one text-gray font-xanhMono">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{post.date}</span>
                                    </div>
                                    
                                </div>
                            </div>

                            {isAuthor && (
                                <div className="flex items-center gap-3 shrink-0">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button className="bg-olive hover:bg-olive/90 text-cream px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button 
                                        onClick={deletePost}
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Article Rich Text Content */}
                        <div className="browser-css prose max-w-none text-brown font-jakrta leading-one-_five text-one_two space-y-6">
                            {parse(post.content)}
                        </div>

                    </div>

                </article>
            </Container>
          
                <Articles className={`relative`}/>
            
        </div>
    ) : null;
}
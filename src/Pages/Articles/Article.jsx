import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

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
        <div className="py-12 bg-skin min-h-screen font-jakrta text-brown">
            <Container>
                <div className="max-w-4xl mx-auto">
                    
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <span className="font-xanhMono text-one_two uppercase tracking-zero-zero_two_five text-blue bg-light-blue/40 px-3 py-1 rounded-full">
                                Article Details
                            </span>
                            <h1 className="font-gaseok text-three_five text-brown mt-3 leading-three_five">
                                {post.title}
                            </h1>
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

                   
                    <div className="w-full mb-10 overflow-hidden rounded-3xl border border-gray/20 shadow-lg bg-white">
                        <img
                           
                            src={appwriteService.filePreview(post.featureImage)}
                            alt={post.title}
                            className="w-full h-[450px] object-cover"
                            onError={(e) => {
                                console.log("Image URL:", e.currentTarget.src);
                                console.log("Feature image ID:", post.featureImage);
                            }}
                        />
                    </div>

                    {/* Article Rich Text Content Container */}
                    <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray/10 mb-12">
                        <div className="browser-css prose max-w-none text-brown font-jakrta leading-one-_five text-one_two">
                            {parse(post.content)}
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    ) : null;
}
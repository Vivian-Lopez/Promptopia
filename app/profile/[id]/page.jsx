"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';  
import Router from 'next/router';

const UserProfile = ({ params }) => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const userName = useSearchParams().get("name");

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
    
        if (session?.user.id) fetchPosts();
      }, [session?.user.id]);

    return (
        <Profile 
            name={userName}
            desc={`Welcome to ${userName}'s profile page`}
            data={posts}
        />
  )
}

export default UserProfile
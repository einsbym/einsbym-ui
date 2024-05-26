'use client';

import { useParams } from 'next/navigation';

export default function ViewBlogPost() {
    const params = useParams<{ slug: string }>();
    return <p>viewing post {params.slug}</p>;
}

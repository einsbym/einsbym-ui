import { FaRegCommentAlt, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';

export default function UserGallery() {
    return (
        <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Gallery</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div>
                    <img className="h-[200px] w-[300px] rounded-lg object-cover" src="#" alt="" />
                </div>
                <div>
                    <img className="h-[200px] w-[300px] rounded-lg object-cover" src="#" alt="" />
                </div>
                <div>
                    <img className="h-[200px] w-[300px] rounded-lg object-cover" src="#" alt="" />
                </div>
                <div>
                    <img
                        className="h-[200px] w-[300px] rounded-lg object-cover"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="h-[200px] w-[300px] rounded-lg object-cover"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        className="h-[200px] w-[300px] rounded-lg object-cover"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

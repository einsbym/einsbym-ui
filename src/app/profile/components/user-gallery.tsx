import { storageUrl } from '@/constants/constants';
import { FIND_IMAGES_BY_USER } from '@/graphql/queries/image';
import { Image } from '@/interfaces/interfaces';
import { useQuery } from '@apollo/client';

export default function UserGallery(props: { userId: string }) {
    const { data } = useQuery(FIND_IMAGES_BY_USER, {
        variables: {
            userId: props.userId,
        },
        fetchPolicy: 'no-cache',
    });

    return (
        <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                Gallery{' '}
                {data && (
                    <span className="text-[#cc00ff] bg-[#cc00ff1e] p-2 w-fit rounded-lg text-base">
                        {data.findImagesByUser.length} images
                    </span>
                )}
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data?.findImagesByUser.map((image: Image) => (
                    <div key={image.id}>
                        <img
                            className="h-[200px] w-[300px] rounded-lg object-cover"
                            src={storageUrl + image.filename}
                            alt={image.filename}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

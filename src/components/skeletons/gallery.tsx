import { TfiGallery } from 'react-icons/tfi';

export default function GallerySkeleton(props: { items: number, width: string, height: string, margin?: string }) {
    const items = new Array(props.items).fill(0);

    return items.map((_, index) => (
        <div key={index} className={`flex items-center justify-center ${props.width} ${props.height} ${props.margin} bg-gray-700 rounded-lg animate-pulse`}>
            <TfiGallery />
        </div>
    ));
}

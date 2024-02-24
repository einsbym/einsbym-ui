export default function ButtonLoadMore(props: { handleClick: any }) {
    return (
        <button
            type="button"
            className="w-full text-white bg-gradient-to-r from-purple-400 via-pink-500 to-[#cc00ff] hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-[#cc00ff] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-3 mb-3"
            onClick={() => {
                props.handleClick();
            }}
        >
            more
        </button>
    );
}

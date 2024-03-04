export default function ButtonLoadMore(props: { handleClick: any }) {
    return (
        <div className="flex w-[200px] mt-5 mb-5 rounded-full mx-auto bg-gradient-to-tr from-violet-400 to-[#cc00ff] p-1 hover:shadow-2xl hover:shadow-[#cc00ff] transition-all duration-200">
            <button
                type="button"
                className="flex-1 font-medium text-lg text-[#cc00ff] bg-black hover:bg-[#cc00ff] hover:text-black py-1 rounded-full transition-all duration-200"
                onClick={() => {
                    props.handleClick();
                }}
            >
                more
            </button>
        </div>
    );
}

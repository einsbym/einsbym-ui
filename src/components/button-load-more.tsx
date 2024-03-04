export default function ButtonLoadMore(props: { handleClick: any }) {
    return (
        <div className="flex w-[100px] lg:w-[200px] mt-5 mb-5 rounded-full mx-auto bg-gradient-to-tr from-violet-400 to-[#cc00ff] p-1 hover:shadow-[0px_0px_25px_#cc00ff] transition-all duration-200">
            <button
                type="button"
                className="flex-1 font-medium text-sm lg:text-lg text-[#cc00ff] bg-[#040d12] hover:bg-[#cc00ff] hover:text-[#040d12] py-1 rounded-full transition-all duration-200"
                onClick={() => {
                    props.handleClick();
                }}
            >
                more
            </button>
        </div>
    );
}

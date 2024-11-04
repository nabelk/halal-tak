export default function Loading() {
    return (
        <>
            <div className='flex items-center justify-center min-h-[150px] p-5  min-w-screen'>
                <div className='flex space-x-2 animate-pulse'>
                    <div className='w-3 h-3  rounded-full bg-teal-500'></div>
                    <div className='w-3 h-3  rounded-full bg-teal-500'></div>
                    <div className='w-3 h-3  rounded-full bg-teal-500'></div>
                </div>
            </div>
        </>
    );
}

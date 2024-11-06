import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from './loading';

const allLogos = Object.fromEntries(
    Object.entries(
        import.meta.glob('@assets/logos/*.{png,jpg,jpeg,PNG,JPEG}', {
            eager: true,
            query: '?url',
            import: 'default',
        }),
    ).map(([key, value]) => [key.split('/').pop(), value]),
);

export function ResultModal({
    choosenDiningToDisplay,
    openModalCurState,
    onClickHandleModalVisibility,
    searchTerm,
}) {
    const [logos, setLogos] = useState(allLogos);
    const [isLogoLoad, setIsLogoLoad] = useState(false);

    useEffect(() => {
        setIsLogoLoad(false);
        document.getElementById('root').className = openModalCurState ? 'overflow-hidden' : '';
    }, [openModalCurState]);

    if (openModalCurState && !choosenDiningToDisplay)
        return (
            <>
                <div
                    className={`bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40 ${
                        openModalCurState ? '' : 'hidden'
                    }`}
                ></div>

                <div
                    id='popup-modal'
                    onClick={(e) => {
                        if (e.target.id === 'popup-modal') {
                            onClickHandleModalVisibility(false);
                        }
                    }}
                    tabIndex='-1'
                    aria-modal={openModalCurState ? 'true' : ''}
                    role={openModalCurState ? 'dialog' : ''}
                    aria-hidden={openModalCurState ? '' : 'true'}
                    className={`${
                        openModalCurState ? 'flex' : 'hidden'
                    } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full font-mono`}
                >
                    <div className='relative p-4 w-full max-w-md max-h-full'>
                        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 dark:text-white'>
                            <button
                                type='button'
                                className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                                data-modal-hide='popup-modal'
                                onClick={() => onClickHandleModalVisibility(false)}
                            >
                                <svg
                                    className='w-3 h-3'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 14 14'
                                >
                                    <path
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                    />
                                </svg>
                                <span className='sr-only'>Close modal</span>
                            </button>
                            <div className='p-4 md:p-5 h-[200px] flex flex-col justify-center items-center'>
                                <h2 className='mt-2 font-bold'>{searchTerm}</h2>
                                <p>No record found on this dining place</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    if (openModalCurState && choosenDiningToDisplay)
        var { Logo, Name, Location, Premise, Central_Kitchen, Ownership } = choosenDiningToDisplay;

    return (
        <>
            <div
                className={`bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40 ${
                    openModalCurState ? '' : 'hidden'
                }`}
            ></div>

            <div
                id='popup-modal'
                onClick={(e) => {
                    if (e.target.id === 'popup-modal') {
                        onClickHandleModalVisibility(false);
                    }
                }}
                tabIndex='-1'
                aria-modal={openModalCurState ? 'true' : ''}
                role={openModalCurState ? 'dialog' : ''}
                aria-hidden={openModalCurState ? '' : 'true'}
                className={`${
                    openModalCurState ? 'flex' : 'hidden'
                } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full font-mono`}
            >
                <div className='relative p-4 w-full max-w-md max-h-full'>
                    <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 dark:text-white'>
                        <button
                            type='button'
                            className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                            data-modal-hide='popup-modal'
                            onClick={() => onClickHandleModalVisibility(false)}
                        >
                            <svg
                                className='w-3 h-3'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 14 14'
                            >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                                />
                            </svg>
                            <span className='sr-only'>Close modal</span>
                        </button>
                        <div className='px-[1.8rem] py-[2.5rem] md:px-[2.5rem] md:py[2.5rem] text-center fade-in'>
                            <div className='flex justify-center relative h-[150px]'>
                                <img
                                    src={choosenDiningToDisplay && logos[Logo]}
                                    alt={`${Name} Logo`}
                                    className={`img-fluid mb-4 w-[150px] ${
                                        isLogoLoad ? 'fade-in' : 'hidden'
                                    }`}
                                    onLoad={() => setIsLogoLoad(true)}
                                />
                                {!isLogoLoad && (
                                    <div className='absolute flex justify-center items-center'>
                                        <Loading />
                                    </div>
                                )}
                            </div>

                            <h2 className='mt-2 font-bold'>{choosenDiningToDisplay && Name}</h2>
                            <h3 className='text-muted'>{choosenDiningToDisplay && Location}</h3>

                            <hr className='my-4 mb-6' />

                            <div className='my-4 text-left mx-auto max-w-[350px]'>
                                <div className='flex items-center justify-between mb-6'>
                                    <div className='flex items-center'>
                                        <span className='fas fa-store mr-3 text-[1em] text-[#aec6cf] w-[1.2rem]'></span>
                                        <p className='ml-1 font-bold'>Premise</p>
                                    </div>

                                    {Premise === 'Yes' ? (
                                        <img
                                            src='/halal-logo.png'
                                            alt='Halal Certification'
                                            className='img-fluid max-w-[40px]'
                                        />
                                    ) : (
                                        <p className='text-[1em]'>N/A</p>
                                    )}
                                </div>

                                <div className='flex items-center justify-between mb-6'>
                                    <div className='flex items-center'>
                                        <span className='fas fa-utensils mr-3 text-[1em] text-[#ffd1b3] w-[1.2rem]'></span>
                                        <p className='ml-1 font-bold'>Central Kitchen</p>
                                    </div>

                                    {Central_Kitchen === 'Yes' ? (
                                        <img
                                            src='/halal-logo.png'
                                            alt='Halal Certification'
                                            className='img-fluid max-w-[40px]'
                                        />
                                    ) : (
                                        <p className='text-[1em]'>N/A</p>
                                    )}
                                </div>

                                <div className='flex items-center justify-between mb-2'>
                                    <div className='flex items-center'>
                                        <span className='fas fa-users mr-3 text-[1em] text-[#b39eb5] w-[1.2rem]'></span>
                                        <p className='ml-1 font-bold'>Ownership</p>
                                    </div>
                                    <span className='badge badge-secondary text-[1em]'>
                                        {choosenDiningToDisplay && Ownership}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ResultModal.propTypes = {
    choosenDiningToDisplay: PropTypes.oneOfType([
        PropTypes.shape({
            Logo: PropTypes.string,
            Name: PropTypes.string,
            Premise: PropTypes.string,
            Ownership: PropTypes.string,
            Central_Kitchen: PropTypes.string,
            Location: PropTypes.string,
        }),
        PropTypes.object,
    ]),
    searchTerm: PropTypes.string,
    openModalCurState: PropTypes.bool.isRequired,
    onClickHandleModalVisibility: PropTypes.func.isRequired,
};

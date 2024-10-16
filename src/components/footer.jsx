export function Footer({ handleTCModalVIsibility }) {
    return (
        <footer className='bg-white dark:bg-gray-800'>
            <div className='w-full py-3 '>
                <div className='flex flex-col items-center gap-3 '>
                    <div className='flex justify-center gap-3'>
                        <a
                            href='https://linktr.ee/halaltak'
                            className='text-gray-500 hover:text-gray-900 dark:hover:text-white '
                            title='Halal Tak Linktree'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                shapeRendering='geometricPrecision'
                                textRendering='geometricPrecision'
                                imageRendering='optimizeQuality'
                                className='w-4 h-4'
                                fillRule='evenodd'
                                clipRule='evenodd'
                                viewBox='0 0 417 512.238'
                            >
                                <path
                                    fill='#43E660'
                                    fillRule='nonzero'
                                    d='M171.274 344.942h74.09v167.296h-74.09V344.942zM0 173.468h126.068l-89.622-85.44 49.591-50.985 85.439 87.829V0h74.086v124.872L331 37.243l49.552 50.785-89.58 85.24H417v70.502H290.252l90.183 87.629L331 381.192 208.519 258.11 86.037 381.192l-49.591-49.591 90.218-87.631H0v-70.502z'
                                />
                            </svg>

                            <span className='sr-only'>Halal Tak Linktree</span>
                        </a>
                    </div>
                    <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
                        © 2024 Halal Tak™| All Rights Reserved |{' '}
                        <a
                            onClick={() => handleTCModalVIsibility(!false)}
                            className='hover:underline cursor-pointer'
                        >
                            Terms Of Use
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export function TCModal({ tcModalCurState, handleTCModalVIsibility }) {
    if (tcModalCurState) {
        return (
            <>
                <div
                    className={`bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40 ${
                        tcModalCurState ? '' : 'hidden'
                    }`}
                ></div>

                <div
                    id='popup-modal'
                    onClick={(e) => {
                        if (e.target.id === 'popup-modal') {
                            handleTCModalVIsibility(false);
                        }
                    }}
                    tabIndex='-1'
                    aria-modal={tcModalCurState ? 'true' : ''}
                    role={tcModalCurState ? 'dialog' : ''}
                    aria-hidden={tcModalCurState ? '' : 'true'}
                    className={`${
                        tcModalCurState ? 'flex' : 'hidden'
                    } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full font-mono`}
                >
                    <div className='relative p-4 w-[90%] md:w-[75%] xl:w-[60%]  max-h-full'>
                        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 dark:text-white'>
                            <button
                                type='button'
                                className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                                data-modal-hide='popup-modal'
                                onClick={() => handleTCModalVIsibility(false)}
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

                            <section className='p-6 md:p-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'>
                                <div className='card'>
                                    <h1 className='text-2xl font-bold mb-4'>Terms of Use</h1>
                                    <p>Effective Date: 16 October 2024</p>
                                    <p>
                                        Welcome to Halal Tak (www.halaltak.com) (the "Website"). By
                                        accessing or using the Website, you agree to be bound by
                                        these Terms of Use (the "Terms"). If you do not agree with
                                        these Terms, please do not use the Website.
                                    </p>

                                    <h2 className='text-xl font-semibold mt-4'>
                                        1. Use of the Website
                                    </h2>
                                    <p>
                                        The Website is intended to find trusted, JAKIM
                                        Halal-certified dining spots in Malaysia. By using the
                                        Website, you agree to comply with all applicable laws and
                                        regulations.
                                    </p>

                                    <h2 className='text-xl font-semibold mt-4'>
                                        2. Third-Party Content Disclaimer
                                    </h2>
                                    <p>
                                        The content and data presented on this Website, including
                                        but not limited to reports, statistics, and other
                                        informational materials, are not created or owned by
                                        Halaltak.com. The content is based on data and reports
                                        prepared by:
                                    </p>
                                    <ul className='flex flex-col items-center list-disc pl-6'>
                                        <li>
                                            Mohd Yushairie Yusoff (
                                            <a
                                                href='https://docs.google.com/spreadsheets/d/1xU3SviCJ4Tzg4YSVC46DbJUGv1hkSHLS/'
                                                className='text-teal-500'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                Link to Spreadsheet
                                            </a>
                                            )
                                        </li>
                                        <li>
                                            Elzar Shariah Solutions & Advisory (
                                            <a
                                                href='https://www.facebook.com/100057142521603/posts/1039134078001333'
                                                className='text-teal-500'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                Facebook Post
                                            </a>
                                            )
                                        </li>
                                    </ul>

                                    <p>
                                        We make no claims or warranties regarding the accuracy,
                                        completeness, or reliability of this content. You agree that
                                        Halal Tak (halaltak.com) cannot be held liable for any
                                        damages, losses, or legal actions that may arise from
                                        reliance on this information. You are responsible for
                                        independently verifying any information provided before
                                        taking any actions based on it.
                                    </p>

                                    <h2 className='text-xl font-semibold mt-4'>
                                        3. Intellectual Property
                                    </h2>
                                    <p>
                                        All other content on the Website, including logos, design
                                        elements, code, and other intellectual property, remains the
                                        property of Halal Tak (halaltak.com) or its licensors,
                                        unless otherwise noted. You may not use, copy, reproduce, or
                                        distribute any part of this Website without prior written
                                        permission.
                                    </p>

                                    <h2 className='text-xl font-semibold mt-4'>4. User Conduct</h2>
                                    <ul className='flex flex-col items-center list-disc pl-6'>
                                        <li>Violate any applicable laws or regulations.</li>
                                        <li>
                                            Upload or distribute viruses or any other harmful code.
                                        </li>
                                        <li>
                                            Engage in activities that could harm the Website or its
                                            users.
                                        </li>
                                        <li>
                                            Use automated systems to access the Website for any
                                            unauthorized purpose.
                                        </li>
                                    </ul>

                                    <h2 className='text-xl font-semibold mt-4'>
                                        5. Limitation of Liability
                                    </h2>
                                    <p>
                                        Halal Tak (halaltak.com) is not liable for any indirect,
                                        incidental, special, consequential, or punitive damages,
                                        including but not limited to loss of profits, data, or other
                                        intangible losses, arising from the use or inability to use
                                        the Website.
                                    </p>

                                    <h2 className='text-xl font-semibold mt-4'>
                                        6. Changes to Terms
                                    </h2>
                                    <p>
                                        We reserve the right to modify these Terms at any time. If
                                        we make changes, we will notify you by posting the updated
                                        Terms on this page with an updated effective date. Your
                                        continued use of the Website after such changes constitutes
                                        your acceptance of the new Terms.
                                    </p>

                                    <h2 className='text-xl font-semibold mt-4'>7. Governing Law</h2>
                                    <p>
                                        These Terms are governed by the laws of Malaysia. Any
                                        disputes arising from or relating to the use of the Website
                                        will be resolved in the courts of Malaysia.
                                    </p>

                                    <h2 className='text-xl font-semibold mt-4'>
                                        8. Contact Information
                                    </h2>
                                    <p>
                                        If you have any questions or concerns about these Terms,
                                        please contact us through our Linktree{' '}
                                        <a
                                            href='https://linktr.ee/halaltak'
                                            className='text-teal-500'
                                        >
                                            here
                                        </a>
                                        .
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

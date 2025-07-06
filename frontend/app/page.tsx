'use client'

export default function Home() {
  return (
    <section>
      <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
          <div className="absolute inset-0 hidden lg:block">
              <img className="object-cover object-right-bottom w-full h-full" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/background.png" alt="" />
          </div>

          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
                  <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">AI Recommendations.<br/> Shop. Faster.</h1>
                  <p className="mt-8 text-base font-normal leading-7 text-gray-400 lg:max-w-md xl:pr-0 lg:pr-16">Shop.ly uses AI to scan the company catalog & suggest most optimal products based on your search.</p>

                  <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
                      <a
                          href="/recommender"
                          title=""
                          className="
                              inline-flex
                              items-center
                              justify-center
                              px-3
                              py-3
                              text-base
                              font-bold
                              leading-7
                              text-gray-900
                              transition-all
                              duration-200
                              bg-white
                              border border-transparent
                              rounded-md
                              sm:px-6
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                              hover:bg-gray-200
                          "
                          role="button"
                      >
                          Try it Out
                      </a>

                      <a
                          href="#"
                          title=""
                          className="
                              inline-flex
                              items-center
                              justify-center
                              px-2
                              py-3
                              text-base
                              font-bold
                              leading-7
                              text-white
                              transition-all
                              duration-200
                              bg-transparent
                              border border-transparent
                              rounded-md
                              sm:px-4
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700
                              hover:bg-gray-700
                          "
                          role="button"
                      >
                          Read the Docs
                      </a>
                  </div>
              </div>
          </div>

          <div className="mt-8 lg:hidden">
              <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/bg.png" alt="" />
          </div>
      </div>
  </section>

  );
}

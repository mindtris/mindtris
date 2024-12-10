<template>
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
      aria-hidden="true"
    >
      <img
        class="max-w-none"
        src="../images/blurred-shape.svg"
        width="760"
        height="668"
        alt="Blurred shape"
      />
    </div>

    <div class="max-w6xl mx-auto px-4 sm:px-6">
      <div
        class="bg-gradient-to-r from-transparent via-gray-800/50 py-12 md:py-20"
      >
        <div class="mx-auto max-w-3xl text-center">
          <h2
            class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-8 text-3xl font-semibold text-transparent md:text-4xl"
            data-aos="fade-up"
          >
            Join the content-first platform
          </h2>
          <div class="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
            <div data-aos="fade-up" data-aos-delay="400">
              <a
                class="btn group mb-4 w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                href="#0"
              >
                <span class="relative inline-flex items-center">
                  Start Building
                  <span
                    class="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5"
                    >-&gt;</span
                  >
                </span>
              </a>
            </div>
            <div data-aos="fade-up" data-aos-delay="600">
              <a
                class="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                href="#0"
                >Schedule Demo</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

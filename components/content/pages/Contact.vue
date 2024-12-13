<script setup>
import PageIllustration from "./../partials/PageIllustration.vue";
</script>

<template>
  <div
    class=" not-prose flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"
  >
    <!-- Page content -->
    <main class="relative grow">
      <!-- Page illustration -->
      <PageIllustration multiple />

      <section>
        <div class="mx-auto max-w-6xl px-4 sm:px-6 contact-us">
          <div class="pt-40 md:pt-40 pb-20 md:pb-20">
            <!-- Section header -->
            <div class="pb-12 text-center">
              <h1
                class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 text-4xl font-semibold text-transparent md:text-5xl"
              >
                Contact us
              </h1>
              <div class="mx-auto max-w-3xl">
                <p class="text-xl text-indigo-200/65">
                  We have custom plans to power your business. Tell us your
                  needs, and we'll contact you shortly.
                </p>
              </div>
            </div>

            <!-- Contact form -->
            <form class="mx-auto max-w-[640px]">
              <div class="space-y-5">
                <div class="flex flex-col gap-x-6 gap-y-4 md:flex-row">
                  <div class="flex-1">
                    <label
                      class="mb-1 block text-sm font-medium text-indigo-200/65"
                      for="first-name"
                      >Full Name*</label
                    >
                    <input
                      id="first-name"
                      type="text"
                      class="form-input w-full"
                      placeholder="Your name"
                    />
                  </div>
                  <div class="flex-1">
                    <label
                      class="mb-1 block text-sm font-medium text-indigo-200/65"
                      for="last-name"
                      >Phone Number*</label
                    >
                    <input
                      id="last-name"
                      type="text"
                      class="form-input w-full"
                      placeholder="Your surname"
                    />
                  </div>
                </div>
                <div class="flex flex-col gap-x-6 gap-y-4 md:flex-row">
                  <div class="flex-1">
                    <label
                      class="mb-1 block text-sm font-medium text-indigo-200/65"
                      for="email"
                      >Business email*</label
                    >
                    <input
                      id="email"
                      type="email"
                      class="form-input w-full"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div class="flex-1">
                    <label
                      class="mb-1 block text-sm font-medium text-indigo-200/65"
                      for="country"
                      >Country*</label
                    >
                    <select
                      id="country"
                      class="form-select w-full text-gray-200"
                    >
                      <option selected disabled hidden>Select a country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-col gap-x-6 gap-y-4 md:flex-row">
                  <div class="flex-1">
                    <label
                      class="mb-1 block text-sm font-medium text-indigo-200/65"
                      for="topic"
                      >Topic</label
                    >
                    <select id="topic" class="form-select w-full text-gray-200">
                      <option selected disabled hidden>Select a topic</option>
                      <option>General</option>
                      <option>Business</option>
                      <option>Finance</option>
                      <option>Health</option>
                      <option>Legal</option>
                      <option>Marketing</option>
                      <option>Productivity</option>
                      <option>Security</option>
                      <option>Software</option>
                      <option>Travel</option>
                    </select>
                  </div>
                  <div class="flex-1">
                    <label
                      class="mb-1 block text-sm font-medium text-indigo-200/65"
                      for="subject"
                      >Subject</label
                    >
                    <input
                      id="subject"
                      type="text"
                      class="form-input w-full"
                      placeholder="Let us know how we can help"
                    />
                  </div>
                </div>
                <div>
                  <label
                    class="mb-1 block text-sm font-medium text-indigo-200/65"
                    for="description"
                    >Full description</label
                  >
                  <textarea
                    id="description"
                    rows="5"
                    class="form-textarea w-full text-gray-200"
                    placeholder="Include as much details as you can"
                  ></textarea>
                </div>
              </div>
              <div
                class="mt-8 flex w-full flex-col justify-between gap-5 md:flex-row md:items-center"
              >
                <p class="text-sm text-indigo-200/65">
                  By continuing, you agree to our
                  <a class="underline hover:no-underline" href="#0"
                    >Terms of Use</a
                  >
                  and
                  <a class="underline hover:no-underline" href="#0"
                    >Privacy policy</a
                  >
                </p>
                <div>
                  <button
                    class="btn group w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
                  >
                    <span class="relative inline-flex items-center">
                      Send
                      <span
                        class="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5"
                        >-&gt;</span
                      >
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

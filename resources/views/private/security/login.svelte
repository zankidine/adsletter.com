<script>
  import { Link } from '@inertiajs/svelte'
  import { ChevronLeft } from '@lucide/svelte';
  import Layout from "~/lib/components/layout.svelte"

</script>

<svelte:head>
    <title>Log In - AdsLetter</title>
</svelte:head>

<Layout>
    <header class="h-[54px] mt-2">
        <nav class="px-4 lg:px-6 flex items-center h-full justify-between">
            <a href="/" class="font-black text-2xl w-fit outline-none">.L.</a>
            <Link href="/signin" class="font-medium outline-none rounded-lg px-6 h-10 flex items-center justify-center leading-10 border hover:bg-primary hover:text-white transition-all duration-300 ease-in-out">Se connecter</Link>
        </nav>
    </header>
    <main class="flex-1 sm:flex items-center pb-16">
        <section class="px-4 w-full pt-16 sm:pt-0">
            <div class="max-w-[360px] w-full h-fit p-4 lg:p-6 mx-auto flex flex-col bg-white rounded-xl">
                <a href="/" class="size-6 overflow-hidden flex items-center justify-center bg-(--bg-primary) rounded-full mb-4">
                    <ChevronLeft size={32} class="opacity-70" />
                </a>
                <div class="flex flex-col gap-1 mb-4">
                    <h1 class="font-bold text-2xl">Mot de passe</h1>
                    <p class="opacity-70 leading-normal">
                        Veuillez saisir votre mot de passe pour vous connecter à votre compte.
                    </p>
                </div>
                <div>
                    <form>
                        <div class="mb-2.5 flex flex-col">
                            <div class="mb-1 flex items-center justify-between">
                                <label for="password" class="text-sm font-medium">Mot de passe</label>
                                <button class="opacity-70 font-medium hover:opacity-100 cursor-pointer leading-normal text-sm">M'envoyer un code</button>
                            </div>
                            <input type="password" id="password" placeholder="Votre mot de passe" class="h-10 px-4 border font-inter text-sm border-(--border-input) rounded-lg focus:bg-(--bg-input-hover) focus:outline-none placeholder:opacity-70 focus:border-primary transition-all duration-300 ease-in-out" />
                        </div>
                        <button type="submit" class="bg-primary text-white font-medium rounded-lg px-4 h-10 flex items-center justify-center leading-10 transition-all duration-300 ease-in-out w-full cursor-pointer hover:opacity-90">Continuer</button>
                    </form>
                </div>
            </div>
        </section>
    </main>
</Layout>
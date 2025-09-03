<script>
  import { Link } from '@inertiajs/svelte'
  import { DoorOpen } from '@lucide/svelte';
  import Layout from "~/lib/components/layout.svelte"

</script>

<svelte:head>
    <title>Sign In - AdsLetter</title>
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
                <div class="size-16 overflow-hidden flex items-center justify-center bg-(--bg-primary) rounded-full mb-4">
                    <DoorOpen size={32} class="opacity-70" />
                </div>
                <div class="flex flex-col gap-1 mb-4">
                    <h1 class="font-bold text-2xl">Bienvenue sur AdsLetter</h1>
                    <p class="opacity-70 leading-normal">
                        Veuillez vous connecter ou vous inscrire ci-dessous.
                    </p>
                </div>
                <div>
                    <form>
                        <div class="mb-2.5 flex flex-col">
                            <label for="email" class="text-sm font-medium mb-1">E-mail</label>
                            <input type="email" id="email" placeholder="vous@email.com" class="h-10 px-4 border font-inter text-sm border-(--border-input) rounded-lg focus:bg-(--bg-input-hover) focus:outline-none placeholder:opacity-70 focus:border-primary transition-all duration-300 ease-in-out" />
                        </div>
                        <button type="submit" class="bg-primary text-white font-medium rounded-lg px-4 h-10 flex items-center justify-center leading-10 transition-all duration-300 ease-in-out w-full cursor-pointer hover:opacity-90">Continuer avec l'e-mail</button>
                    </form>
                    <div class="mt-4">
                        <hr class="border-(--border-input) h-[1px] w-full mb-4" />
                        <a href="/" class="font-medium outline-none rounded-lg px-6 h-10 flex gap-1.5 items-center justify-center leading-10 border hover:bg-blue hover:text-white transition-all duration-300 ease-in-out">
                            <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C270.5 52.6 106.3 116.6 106.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H260v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4"></path></svg>
                            Se connecter avec Google
                        </a>
                        <p class="mt-4 text-xs opacity-70">En continuant, vous acceptez nos <a href="/terms" class="underline hover:opacity-80">Conditions d'utilisation</a> et notre <a href="/privacy" class="underline hover:opacity-80">Politique de confidentialité</a>.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</Layout>
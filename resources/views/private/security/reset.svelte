<script>
  import { Link } from '@inertiajs/svelte'
  import Layout from "~/lib/components/layout.svelte"

  let isFocused = $state(true);

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
        <section class="px-4 w-full flex flex-col pt-16 sm:pt-0">
            <div class="max-w-[360px] w-full h-fit p-4 lg:p-6 mx-auto">
                <h1 class="font-bold text-2xl">Réinitialiser le mot de passe</h1>
            </div>
            <div class="max-w-[360px] w-full h-fit p-4 lg:p-6 mx-auto flex flex-col bg-white rounded-xl">
                <div class="flex flex-col gap-1 mb-4">
                    <p class="opacity-70 leading-normal">
                        Choisissez un nouveau mot de passe pour votre compte sous <strong class="opacity-100 font-semibold">zankidine.abdou60@gmail.com</strong>.
                    </p>
                </div>
                <div>
                    <form>
                        <div class="mb-3 flex flex-col">
                            <label for="password" class="text-sm font-medium sr-only">Nouveau mot de passe</label>
                            <input type="password" id="password" placeholder="Nouveau mot de passe" class="h-10 px-4 border font-inter text-sm border-(--border-input) rounded-lg focus:bg-(--bg-input-hover) focus:outline-none placeholder:opacity-70 focus:border-primary transition-all duration-300 ease-in-out" />
                            {#if isFocused}
                                <small class="text-sm mt-1 leading-normal font-medium">Veuillez choisir un mot de passe fort d'au moins 8 caractères.</small>
                            {/if}
                        </div>
                        <button type="submit" class="bg-primary text-white font-medium rounded-lg px-4 h-10 flex items-center justify-center leading-10 transition-all duration-300 ease-in-out w-full cursor-pointer hover:opacity-90">Modifier le mot de passe</button>
                    </form>
                </div>
            </div>
        </section>
    </main>
</Layout>
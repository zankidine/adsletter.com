import User from "#models/user";

// Type spécifique pour les données de profil autorisées
type ProfileData = Partial<Pick<User, 'firstName' | 'lastName' | 'userName' | 'bio' | 'website' | 'instagram' | 'twitter' | 'linkedin' | 'facebook' | 'youtube' | 'tiktok' | 'github' | 'phoneNumber'>>

/**
 * Service pour les actions sur le compte utilisateur
 * Suppression, mise à jour des informations
 */
export class AccountService {
  /**
   * Supprime définitivement un compte utilisateur
   * @param user - L'utilisateur à supprimer
   */
  async deleteAccount(user: User): Promise<void> {
    // Supprimer l'utilisateur (les relations en cascade sont gérées par la base de données)
    await user.delete()
  }

  /**
   * Met à jour les informations du profil
   */
  async updateProfile(user: User, profileData: ProfileData): Promise<User> {
    // Mettre à jour uniquement les champs autorisés
    const allowedFields: (keyof ProfileData)[] = [
      'firstName',
      'lastName',
      'userName',
      'bio',
      'website',
      'instagram',
      'twitter',
      'linkedin',
      'facebook',
      'youtube',
      'tiktok',
      'github',
      'phoneNumber',
    ]

    for (const key of allowedFields) {
      if (profileData[key] !== undefined) {
        user[key] = profileData[key]
      }
    }

    // Sauvegarder les modifications
    await user.save()

    return user
  }

}
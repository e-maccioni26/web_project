import TacheRepository from '../repositories/TacheRepository';
import TacheTagRepository from '../repositories/TacheTagRepository';
import UserTachesRepository from '../repositories/UserTachesRepository';
import UserService from './UserService';
import Notifyer from "../config/notify"

class TacheService {
  async createTache(data: any) {
    return await TacheRepository.createTache(data);
  }

  async getTaches(filters: any) {
    console.log('filters', filters);
    return await TacheRepository.findAllTaches(filters);
  }

  async getTacheById(id: number) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tâche introuvable');
    return tache;
  }

  async updateTache(id: number, data: any) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tâche introuvable');
    return await TacheRepository.updateTache(id, data);
  }

  async deleteTache(id: number) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tâche introuvable');
    return await TacheRepository.deleteTache(id);
  }

  async getTags(id: number) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tache introuvable');
    return await TacheTagRepository.getTags(id);
  }

  async addTags(id: number, tags: number[]) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tache introuvable');
    const tagOnTask = await TacheTagRepository.isTagOntask(id, tags);
    if(tagOnTask) throw new Error('Le tag est déja associé à la tâche');
    return await TacheTagRepository.addTags(id, tags);
  }

  async removeTags(id: number, tags: number[]) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tache introuvable');
    const tagOnTask = await TacheTagRepository.isTagOntask(id, tags);
    if (!tagOnTask) throw new Error("Le tag n'est pas présent dans la tâche");
    return await TacheTagRepository.removeTags(id, tags);
  }

  async getUsers(id: number) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tache introuvable');
    return await UserTachesRepository.getTacheUsers(id);
  }

  async addUsers(id: number, usersIds: number[]) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tache introuvable');
    const content = `${ JSON.stringify(tache.dataValues, null, 2)}`
    const subject = `Affectation à ${tache.titre}`
    const userInTache = await UserTachesRepository.isUserInTache(id, usersIds);
    usersIds.forEach(async (userId) => {
      const user = await UserService.getUserById(userId)
      const url = await Notifyer.send(
        user.email,
        content,
        subject
      )
      console.log(url)
    });

      

    
    if(userInTache) throw new Error('Utilisateur déja présent dans la tâche');
    return await UserTachesRepository.addUsers(id, usersIds);
  }

  async removeUsers(id: number, usersIds: number[]) {
    const tache = await TacheRepository.findTacheById(id);
    if (!tache) throw new Error('Tache introuvable');
    const userInTache = await UserTachesRepository.isUserInTache(id, usersIds);
    if (!userInTache) throw new Error('Utilisateur absent de la têche');
    return await UserTachesRepository.removeUsers(id, usersIds);
  }

}

export default new TacheService();

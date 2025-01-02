const FavoritesManager = {
    AddToFavorites: function (id: number) {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.push(id);
        favorites = toDistinct(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return favorites;
    },

    RemoveFromFavorites: function (id: number) {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites = favorites.filter((favorite: number) => favorite !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return favorites;
    },

    getFavorites: function () {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    },

    isFavorite: function (id: number) {
        const favorites = this.getFavorites();
        return favorites.includes(id);
    }
};

export const { AddToFavorites, RemoveFromFavorites, getFavorites, isFavorite } = FavoritesManager;
export default FavoritesManager;

function toDistinct(array: Array<number>) {
    return [...new Set(array)];
}
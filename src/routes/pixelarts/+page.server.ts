import { prisma } from '$lib';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({cookies}) => {

    let username = cookies.get('username');
    if (!username) {
        throw error(401, 'Unauthorized');
    }
    //find the user by username
    const user = await prisma.user.findUnique({
        where: {
            name: username,
        },
    });
    if (!user) {
        throw error(401, 'Unauthorized');
    }
    let favorite = user.favorites;
    if (favorite == ""){
        favorite = "[]"
    }
    let favoriteArray = JSON.parse(favorite);
    //load all pixelart 

    const arts = await prisma.pixelArt.findMany({});
    const artList = arts.map((art) => {
        if (favoriteArray.includes(art.id.toString())) {
            return {
                ...art,
                isFavorite: true,
            };
        }
        return {
            ...art,
            isFavorite: false,
        };
    });

    return {arts: artList};
}) satisfies PageServerLoad;

export const actions: Actions = {
    // action to create new pixelart

    create: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('name')?.toString();
        const height = data.get('height')?.toString();
        const width = data.get('width')?.toString();

        if (!name || !height || !width) {
            throw error(400, 'Missing name, height or width');


        }
        //create the pixels for the pixelart
        
        const pixels = [];
        const parsedHeight = parseInt(height, 10);
        const parsedWidth = parseInt(width, 10);

        for (let i = 0; i < parsedHeight; i++) {
            for (let j = 0; j < parsedWidth; j++){
                pixels.push({
                    x: j,
                    y: i,
                    color: 'white',
                });
            }
        }



        //store the pixelart in the database
        const pixelArt = await prisma.pixelArt.create({
            data: {
                name,
                width: parsedWidth,
                height: parsedHeight,
                pixels: {
                    create: pixels,
                },
            },
        });

        
        
    },
    favorite: async ({ request, cookies }) => {
        const data = await request.formData();
        const artid = data.get('artid')?.toString();

        if (!artid) {
            throw error(400, 'Missing artid');
        }

        let username = cookies.get('username');
        if (!username) {
            throw error(401, 'Unauthorized');
        }
        //find the user by username
        const user = await prisma.user.findUnique({
            where: {
                name: username,
            },
        });
        if (!user) {
            throw error(401, 'Unauthorized');
        }
        let favorite = user.favorites;
        if (favorite == ""){
            favorite = "[]"
        }
        let favoriteArray = JSON.parse(favorite);
        if (favoriteArray.includes(artid)) {
            favoriteArray = favoriteArray.filter((item : any) => item !== artid);
        } else {
            favoriteArray.push(artid);
        }
        favorite = JSON.stringify(favoriteArray);
        //update the user's favorites
        await prisma.user.update({
            where: {
                name: username,
            },
            data: {
                favorites: favorite,
            },
        });
        const arts = await prisma.pixelArt.findMany({});
        const artList = arts.map((art) => {
            if (favoriteArray.includes(art.id.toString())) {
                return {
                    ...art,
                    isFavorite: true,
                };
            }
            return {
                ...art,
                isFavorite: false,
            };
        });

        return {arts: artList};
    }
};
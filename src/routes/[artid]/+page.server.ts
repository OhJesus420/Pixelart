import { prisma } from '$lib';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({params}) => {
    const {artid} = params;

    //load the pixelart by artid

    const art = await prisma.pixelArt.findUnique({
        where: {
            id: parseInt(artid),
        },
        include: {
            pixels: true,
        },
    });

    if (!art) {

            throw error(404, 'Pixel art not found');

    }
    return {art};
}) satisfies PageServerLoad;

export const actions: Actions = {
    update: async ({ params, request }) => {
        const data = await request.formData();
        const pixelid = data.get('pixelid')?.toString();
        let color = data.get('color')?.toString();

        if (!pixelid) {
            throw error(400, 'Missing pixelid');
        }


        console.log(color)
    
        //update the pixel in the database to color picked
        await prisma.pixel.update({
            where: {
                id: parseInt(pixelid),
            },
            data: {
                color: color,
            },
        });

        
     
    }

};
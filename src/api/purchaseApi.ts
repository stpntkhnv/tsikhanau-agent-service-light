import {LaunchParams} from "@vkontakte/vk-bridge/dist/types/src/parseURLSearchParamsForGetLaunchParams";

const backEndUrl: string = 'https://b29e-80-238-119-14.ngrok-free.app/api'

export async function createPurchase(data: any) {
    try {
        const response = await fetch(backEndUrl + '/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function fetchPurchases() {
    try {
        const response = await fetch(backEndUrl + '/purchases');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const a = await response.json();
        console.log(a)
        return a
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function fetchPurchaseById(purchaseId: string): Promise<PurchaseDto> {
    try {
        const response = await fetch(backEndUrl + `/purchases/${purchaseId}`);
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            throw new Error('Expected JSON response');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function processPhotoOrganization(purchaseId: string, albumId: number, launchParams: LaunchParams): Promise<any> {
    const response = await fetch(backEndUrl + '/photo-organizer', {
        method: 'POST',
        headers: {
            'x-mm-user-id': launchParams.vk_user_id.toString(),
            'x-mm-community-id': launchParams.vk_group_id?.toString(),
            'Content-Type': 'application/json',
            'x-mm-vk-access-token': localStorage.getItem('vk_access_token'),
        },
        body: JSON.stringify({
            purchaseId: purchaseId,
            albumId: albumId,
        })

    });
    const x = await response.json()
    console.log(x)
}

export interface PurchaseDto {
    id: string;
    name: string;
    description: string;
    communityId: number;
    albumId: number;
    agentId: number;
    startDate: string;
    endDate: string;
}

export async function copyPhotos(donorAlbumId: number, donorGroupId: number, testAlbumId: number, testGroupId: number, count: number, launchParams: LaunchParams): Promise<any> {
    await fetch(backEndUrl + '/test/copy-descriptions', {
        method: 'POST',
        headers: {
            'x-mm-user-id': launchParams.vk_user_id.toString(),
            'x-mm-community-id': launchParams.vk_group_id?.toString(),
            'Content-Type': 'application/json',
            'x-mm-vk-access-token': localStorage.getItem('vk_access_token'),
        },
        body: JSON.stringify({
            groupId: donorGroupId,
            albumId: donorAlbumId,
            testGroupId: testGroupId,
            testAlbumId: testAlbumId,
            count: count
        })
    });
}
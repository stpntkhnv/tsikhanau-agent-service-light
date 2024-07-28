import React, {FC, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardGrid,
    Div,
    Gallery,
    Group,
    Header,
    NavIdProps,
    Panel,
    PanelHeader, Tappable,
    Text
} from "@vkontakte/vkui";
import {useParams, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {fetchPurchaseById, processPhotoOrganization, PurchaseDto} from "../api/purchaseApi.ts";
import bridge from "@vkontakte/vk-bridge";
import {useLaunchParams} from "../contexts/LaunchParamsContext.tsx";
import {AlbumDto} from "../models/album.ts";

export const PhotoOrganizer: FC<NavIdProps> = ({ id }) => {
    const router = useRouteNavigator();
    const launchParams = useLaunchParams()
    const { purchaseId } = useParams<{ purchaseId: string }>();
    const [purchase, setPurchase] = useState<PurchaseDto | null>({});
    const [albums, setAlbums] = useState<AlbumDto[]>(null);
    const [selectedAlbum, setSelectedAlbum] = useState<AlbumDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [activeAlbum, setActiveAlbum] = useState<AlbumDto>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const response = await bridge.send("VKWebAppCallAPIMethod", {
                    method: "photos.getAlbums",
                    request_id: "getAlbums",
                    params: {
                        owner_id: -launchParams.vk_group_id,
                        v: "5.199",
                        access_token: localStorage.getItem('vk_access_token'),
                        need_system: 1,
                        need_covers: 1
                    }
                });

                console.log(response)
                setAlbums(response.response.items);
                setLoading(false);
            } catch (error) {
                setError('Error fetching albums');
                setLoading(false);
            }
        };

        if (purchaseId) {
            fetchAlbums()
        }
    }, []);

    /*useEffect(() => {

        alert(step)
        if (purchaseId) {
            fetchPurchaseById(purchaseId)
                .then(data => {
                    console.log(data)
                    setPurchase(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }

        fetchAlbums()
    }, [purchaseId]);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const response = await bridge.send("VKWebAppCallAPIMethod", {
                method: "photos.getAlbums",
                request_id: "getAlbums",
                params: {
                    v: "5.131",
                    access_token: localStorage.getItem('vk_access_token'),
                    need_system: 1,
                }
            });
            console.log(response)
            setAlbums(response.response.items);
            setLoading(false);
        } catch (error) {
            setError('Error fetching albums');
            setLoading(false);
        }
    };

    const handleAlbumClick = (album: AlbumDto) => {
        setSelectedAlbum(album);
        setStep(3);
    };*/

    function handleAlbumClick(album: AlbumDto) {
        
    }

    function startProcessing() {
        setLoading(true)
        setStep(3)
        processPhotoOrganization(purchaseId, activeAlbum.id, launchParams);
    }

    return (
        <Panel id={id}>
            <PanelHeader>Анализ альбомов</PanelHeader>
            <Group>
                {loading ? (
                    <Div>Загрузка...</Div>
                ) : error ? (
                    <Div>Ошибка: {error}</Div>
                ) : (
                    <>
                        {step === 1 && purchase && (
                            <>
                                <CardGrid style={{ justifyContent: 'space-between' }}>
                                    {albums.map(album => (
                                        <Card key={album.id} style={activeAlbum?.id === album.id ? { border: '2px solid blue', flex: '1 0 18%', margin: 0 } : { flex: '1 0 18%', margin: 0, border: '2px solid white' }}>
                                            <Tappable onClick={() => setActiveAlbum(album)}>
                                                <div style={{ width: '100%', height: 0, paddingBottom: '100%', position: 'relative' }}>
                                                    <img
                                                        src={album.thumb_src}
                                                        alt={album.title}
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                            borderRadius: 8
                                                        }}
                                                    />
                                                </div>
                                                <Div>
                                                    <Text weight="medium">{album.title}</Text>
                                                    <Text>Количество фотографий: {album.size}</Text>
                                                </Div>
                                            </Tappable>
                                        </Card>
                                    ))}
                                </CardGrid>
                                <Button
                                    appearance={"accent"}
                                    stretched={false}
                                    align={"center"}
                                    loading={loading}
                                    onClick={() => {setStep(2)}}
                                >
                                    Далее
                                </Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Div>
                                    <Button size="l" stretched onClick={() => setStep(1)}>
                                        Назад
                                    </Button>
                                </Div>
                                <Div>
                                    <Text>
                                        Это просто предупреждение. Подтвердите, что вы хотите продолжить, нажав на кнопку внизу
                                    </Text>
                                </Div>
                                <Div>
                                    <Button size="l" stretched onClick={() => startProcessing()}>
                                        Подтвердить
                                    </Button>
                                </Div>
                            </>
                        )}
                        {step === 3 && activeAlbum && (
                            <>
                                <Div>
                                    <Button size="l" stretched onClick={() => setStep(2)}>
                                        Назад
                                    </Button>
                                </Div>
                                <Div>
                                    <Header>Альбом: {activeAlbum.title}</Header>
                                    <Text>Количество фотографий: {activeAlbum.size}</Text>
                                    {/* Здесь можно добавить дополнительную информацию и функционал */}
                                </Div>
                            </>
                        )}
                    </>
                )}
            </Group>
        </Panel>
    );
};
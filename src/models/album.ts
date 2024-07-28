export interface AlbumDto {
    can_delete: boolean;
    can_include_to_feed: boolean;
    can_upload: number;
    comments_disabled: number;
    created: number;
    description: string;
    feed_disabled: number;
    feed_has_pinned: number;
    id: number;
    owner_id: number;
    size: number;
    thumb_id: number;
    thumb_is_last: number;
    thumb_src: string;
    title: string;
    updated: number;
    upload_by_admins_only: number;
}

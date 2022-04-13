export interface IMovieDTO {
	title: string,
	releaseDate: string,
	genre: string,
	description: string,
	price: number,
	itunesLink: string,
	trailerLink: string,
	thumbnailLink: string,
}

export interface IMovieResponse extends IMovieDTO {
	_id: string;
}

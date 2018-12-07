// import { MatSnackBar } from '@angular/material';
// import { IShop } from '@app/modules/catalog/modules/shops/shared/shop.interface';
// import {
//   ActivateShop,
//   ArchiveShop,
//   CreateShop,
//   FetchShop,
//   FetchShops,
//   ShopsOperationFailed,
//   ShopsOperationSuccess,
//   UpdateShop
// } from '@app/modules/catalog/modules/shops/state/shops.actions';
// import { ITableData } from '@lib/models';
// import { TranslateService } from '@ngx-translate/core';
// import { Navigate } from '@ngxs/router-plugin';
// import { Action, Selector, State, StateContext } from '@ngxs/store';
// import { throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// import { ShopsService } from '../shared/shops.service';
// import { ShopsStateModel } from './shops.model';
// import { HttpErrorResponse } from '@angular/common/http';

// @State<ShopsStateModel>({
//   name: 'shops',
//   defaults: {
//     shops: null,
//     shop: null,
//     loading: false
//   }
// })
// export class ShopsState {
//   constructor(private service: ShopsService, private snackBar: MatSnackBar, private translate: TranslateService) {}

//   /**
//    * Selectors
//    */
//   @Selector()
//   public static loading({ loading }: ShopsStateModel) {
//     return loading;
//   }

//   @Selector()
//   public static shops({ shops }: ShopsStateModel) {
//     return shops;
//   }

//   @Selector()
//   public static shop({ shop }: ShopsStateModel) {
//     return shop;
//   }

//   /**
//    * Commands
//    */
//   @Action(FetchShops)
//   public fetchShopsList(ctx: StateContext<ShopsStateModel>, { page, pageSize, archived }: FetchShops) {
//     ctx.patchState({ loading: true });
//     return this.service.list(page, pageSize, archived).pipe(
//       tap((shops: ITableData<IShop>) => ctx.patchState({ shops, loading: false })),
//       catchError((error: any) => ctx.dispatch(new ShopsOperationFailed(error)))
//     );
//   }

//   @Action(FetchShop)
//   public fetchShop(ctx: StateContext<ShopsStateModel>, { id }: FetchShop) {
//     ctx.patchState({ loading: true });
//     return this.service.get(id).pipe(
//       tap((shop: IShop) => ctx.patchState({ shop, loading: false })),
//       catchError((error: any) => ctx.dispatch(new ShopsOperationFailed(error)))
//     );
//   }

//   @Action(CreateShop)
//   public createShop(ctx: StateContext<ShopsStateModel>, { shop }: CreateShop) {
//     ctx.patchState({ loading: true });
//     return this.service.create(shop).pipe(
//       tap(() => ctx.dispatch(new ShopsOperationSuccess('catalog/shops', 'CREATE_SUCCESS'))),
//       catchError(({ error }: HttpErrorResponse) => ctx.dispatch(new ShopsOperationFailed(error && error.errors[0], 'UPDATE_FAILED')))
//     );
//   }

//   @Action(UpdateShop)
//   public updateShop(ctx: StateContext<ShopsStateModel>, { shop }: UpdateShop) {
//     ctx.patchState({ loading: true });
//     const { id } = ctx.getState().shop;
//     return this.service.update(id, shop).pipe(
//       tap(() => ctx.dispatch(new ShopsOperationSuccess('catalog/shops', 'UPDATE_SUCCESS'))),
//       catchError(({ error }: HttpErrorResponse) => ctx.dispatch(new ShopsOperationFailed(error && error.errors[0], 'UPDATE_FAILED')))
//     );
//   }

//   @Action(ArchiveShop)
//   public archiveShop(ctx: StateContext<ShopsStateModel>, { id }: ArchiveShop) {
//     ctx.patchState({ loading: true });
//     return this.service.archive(id).pipe(
//       tap(() => ctx.dispatch(new ShopsOperationSuccess(null, 'ARCHIVE_SUCCESS'))),
//       catchError((error: any) => ctx.dispatch(new ShopsOperationFailed(error, 'ARCHIVE_FAILED')))
//     );
//   }

//   @Action(ActivateShop)
//   public activateShop(ctx: StateContext<ShopsStateModel>, { id }: ActivateShop) {
//     ctx.patchState({ loading: true });
//     return this.service.activate(id).pipe(
//       tap(() => ctx.dispatch(new ShopsOperationSuccess(null, 'ACTIVATE_SUCCESS'))),
//       catchError((error: any) => ctx.dispatch(new ShopsOperationFailed(error, 'ACTIVATE_FAILED')))
//     );
//   }

//   /**
//    * Events
//    */
//   @Action(ShopsOperationSuccess)
//   public onShopsOperationSuccess(ctx: StateContext<ShopsStateModel>, { path, snackTranslate }: ShopsOperationSuccess) {
//     if (snackTranslate) {
//       this.translate.get(`SHOPS.MESSAGES.${snackTranslate}`).subscribe(message => this.snackBar.open(message));
//     }
//     if (!path) {
//       return ctx.patchState({ loading: false });
//     }
//     return ctx.dispatch(new Navigate([path]));
//   }

//   @Action(ShopsOperationFailed)
//   public onShopsOperationFailed(ctx: StateContext<ShopsStateModel>, { error, snackTranslate }: ShopsOperationFailed) {
//     const translate = 'SHOPS.MESSAGES.';
//     if (error) {
//       this.translate
//         .get(`${translate}${error.field.toUpperCase()}_${error.code.toUpperCase()}`)
//         .subscribe(message => this.snackBar.open(message));
//     } else if (snackTranslate) {
//       this.translate.get(`${translate}${snackTranslate}`).subscribe(message => this.snackBar.open(message));
//     }
//     ctx.patchState({ loading: false });
//     return throwError(error);
//   }
// }
